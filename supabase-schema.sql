-- Esquema de base de datos para InmoPlus
-- Ejecutar este script en el SQL Editor de Supabase

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'agent', 'admin')),
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de agentes
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    avatar TEXT DEFAULT '/placeholder-user.jpg',
    specialization VARCHAR(255) DEFAULT 'Residencial',
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    reviews INTEGER DEFAULT 0,
    properties_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de propiedades
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL CHECK (price > 0),
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
    bathrooms INTEGER NOT NULL CHECK (bathrooms >= 0),
    area DECIMAL(8,2) NOT NULL CHECK (area > 0),
    type VARCHAR(50) NOT NULL CHECK (type IN ('casa', 'apartamento', 'oficina', 'local', 'terreno')),
    operation VARCHAR(20) NOT NULL CHECK (operation IN ('venta', 'alquiler')),
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    furnished BOOLEAN DEFAULT FALSE,
    parking BOOLEAN DEFAULT FALSE,
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    coordinates JSONB DEFAULT '{"lat": 0, "lng": 0}',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de citas
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de favoritos
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Tabla de preguntas frecuentes (FAQs)
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_operation ON properties(operation);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

CREATE INDEX IF NOT EXISTS idx_appointments_property_id ON appointments(property_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client_email ON appointments(client_email);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

CREATE INDEX IF NOT EXISTS idx_contact_messages_property_id ON contact_messages(property_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_agent_id ON contact_messages(agent_id);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_property_id ON favorites(property_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar el contador de propiedades del agente
CREATE OR REPLACE FUNCTION update_agent_properties_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE agents SET properties_count = properties_count + 1 WHERE id = NEW.agent_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE agents SET properties_count = properties_count - 1 WHERE id = OLD.agent_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger para mantener el contador de propiedades actualizado
CREATE TRIGGER update_agent_properties_count_trigger
    AFTER INSERT OR DELETE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_agent_properties_count();

-- Políticas de seguridad RLS (Row Level Security)
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para agentes (lectura pública)
CREATE POLICY "Anyone can view agents" ON agents
    FOR SELECT USING (true);

CREATE POLICY "Agents can update their own profile" ON agents
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Políticas para propiedades (lectura pública)
CREATE POLICY "Anyone can view properties" ON properties
    FOR SELECT USING (true);

CREATE POLICY "Agents can manage their own properties" ON properties
    FOR ALL USING (auth.uid()::text = agent_id::text);

-- Políticas para citas
CREATE POLICY "Anyone can create appointments" ON appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (client_email = (SELECT email FROM users WHERE id = auth.uid()));

CREATE POLICY "Agents can view appointments for their properties" ON appointments
    FOR SELECT USING (
        property_id IN (
            SELECT id FROM properties WHERE agent_id::text = auth.uid()::text
        )
    );

-- Políticas para mensajes de contacto
CREATE POLICY "Anyone can create contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Agents can view messages for their properties" ON contact_messages
    FOR SELECT USING (
        agent_id::text = auth.uid()::text OR
        property_id IN (
            SELECT id FROM properties WHERE agent_id::text = auth.uid()::text
        )
    );

-- Políticas para favoritos
CREATE POLICY "Users can manage their own favorites" ON favorites
    FOR ALL USING (auth.uid() = user_id);

-- Políticas de seguridad RLS para FAQs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Admins can manage faqs" ON faqs FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Trigger para updated_at en faqs
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Datos de ejemplo para agentes
INSERT INTO agents (id, name, email, phone, specialization, rating, reviews, properties_count) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'María García', 'maria.garcia@inmoplus.com', '+34 600 111 111', 'Residencial', 4.8, 127, 0),
('550e8400-e29b-41d4-a716-446655440002', 'Carlos Rodríguez', 'carlos.rodriguez@inmoplus.com', '+34 600 222 222', 'Comercial', 4.6, 89, 0),
('550e8400-e29b-41d4-a716-446655440003', 'Ana López', 'ana.lopez@inmoplus.com', '+34 600 333 333', 'Lujo', 4.9, 156, 0)
ON CONFLICT (id) DO NOTHING;

-- Datos de ejemplo para propiedades
INSERT INTO properties (id, title, price, location, city, address, image, images, bedrooms, bathrooms, area, type, operation, description, features, furnished, parking, agent_id, coordinates, featured) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Casa Moderna en el Centro', 450000, 'Centro Histórico', 'Madrid', 'Calle Mayor 123', '/images/modern-villa.jpg', ARRAY['/images/modern-villa.jpg', '/images/modern-interior.jpg'], 4, 3, 180, 'casa', 'venta', 'Hermosa casa moderna en el corazón de Madrid con acabados de lujo y excelente ubicación.', ARRAY['Terraza', 'Jardín', 'Garaje'], true, true, '550e8400-e29b-41d4-a716-446655440001', '{"lat": 40.4168, "lng": -3.7038}', true),
('660e8400-e29b-41d4-a716-446655440002', 'Apartamento de Lujo', 2800, 'Salamanca', 'Madrid', 'Calle Velázquez 45', '/images/modern-interior.jpg', ARRAY['/images/modern-interior.jpg', '/images/modern-villa.jpg'], 3, 2, 120, 'apartamento', 'alquiler', 'Apartamento de lujo en la zona más exclusiva de Madrid con vistas espectaculares.', ARRAY['Piscina', 'Gimnasio', 'Portero'], true, true, '550e8400-e29b-41d4-a716-446655440002', '{"lat": 40.4168, "lng": -3.7038}', true),
('660e8400-e29b-41d4-a716-446655440003', 'Oficina Ejecutiva', 1800, 'Centro de Negocios', 'Barcelona', 'Avenida Diagonal 500', '/images/colonial-building.jpg', ARRAY['/images/colonial-building.jpg'], 0, 2, 80, 'oficina', 'alquiler', 'Oficina ejecutiva en el centro financiero de Barcelona con todas las comodidades.', ARRAY['Recepción', 'Sala de reuniones', 'Parking'], false, true, '550e8400-e29b-41d4-a716-446655440003', '{"lat": 41.3851, "lng": 2.1734}', false)
ON CONFLICT (id) DO NOTHING; 