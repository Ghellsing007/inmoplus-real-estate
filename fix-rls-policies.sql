-- Script para corregir las políticas RLS en Supabase
-- Ejecuta este script en el SQL Editor de Supabase

-- Deshabilitar RLS temporalmente para debugging
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
ALTER TABLE agents DISABLE ROW LEVEL SECURITY;
ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Habilitar RLS nuevamente
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Agents are viewable by everyone" ON agents;
DROP POLICY IF EXISTS "Agents can insert their own data" ON agents;
DROP POLICY IF EXISTS "Agents can update their own data" ON agents;

DROP POLICY IF EXISTS "Properties are viewable by everyone" ON properties;
DROP POLICY IF EXISTS "Agents can insert properties" ON properties;
DROP POLICY IF EXISTS "Agents can update properties" ON properties;

DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

DROP POLICY IF EXISTS "Users can view own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can insert own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON favorites;

DROP POLICY IF EXISTS "Users can view own appointments" ON appointments;
DROP POLICY IF EXISTS "Agents can view appointments" ON appointments;
DROP POLICY IF EXISTS "Users can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Users can update own appointments" ON appointments;
DROP POLICY IF EXISTS "Agents can update appointments" ON appointments;

DROP POLICY IF EXISTS "Contact messages are viewable by agents" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Agents can update contact messages" ON contact_messages;

-- Crear políticas más permisivas para desarrollo
-- Políticas para agentes (lectura pública, escritura para todos)
CREATE POLICY "Agents are viewable by everyone" ON agents FOR SELECT USING (true);
CREATE POLICY "Anyone can insert agents" ON agents FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update agents" ON agents FOR UPDATE USING (true);

-- Políticas para propiedades (lectura pública, escritura para todos)
CREATE POLICY "Properties are viewable by everyone" ON properties FOR SELECT USING (true);
CREATE POLICY "Anyone can insert properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update properties" ON properties FOR UPDATE USING (true);

-- Políticas para usuarios (lectura/escritura para todos)
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update users" ON users FOR UPDATE USING (true);

-- Políticas para favoritos (lectura/escritura para todos)
CREATE POLICY "Favorites are viewable by everyone" ON favorites FOR SELECT USING (true);
CREATE POLICY "Anyone can insert favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete favorites" ON favorites FOR DELETE USING (true);

-- Políticas para citas (lectura/escritura para todos)
CREATE POLICY "Appointments are viewable by everyone" ON appointments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update appointments" ON appointments FOR UPDATE USING (true);

-- Políticas para mensajes de contacto (lectura/escritura para todos)
CREATE POLICY "Contact messages are viewable by everyone" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update contact messages" ON contact_messages FOR UPDATE USING (true); 