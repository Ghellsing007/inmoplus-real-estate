-- Script para insertar datos mock en InmoPlus
-- Ejecutar este script en el SQL Editor de Supabase después de crear las tablas

-- ===== DATOS DE AGENTES =====
INSERT INTO agents (id, name, email, phone, avatar, specialization, rating, reviews, properties_count) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'María García', 'maria.garcia@inmoplus.com', '+34 600 111 111', '/images/agent-profile.png', 'Residencial', 4.8, 127, 0),
('550e8400-e29b-41d4-a716-446655440002', 'Carlos Rodríguez', 'carlos.rodriguez@inmoplus.com', '+34 600 222 222', '/images/agent-profile.png', 'Comercial', 4.6, 89, 0),
('550e8400-e29b-41d4-a716-446655440003', 'Ana López', 'ana.lopez@inmoplus.com', '+34 600 333 333', '/images/agent-profile.png', 'Lujo', 4.9, 156, 0),
('550e8400-e29b-41d4-a716-446655440004', 'David Martínez', 'david.martinez@inmoplus.com', '+34 600 444 444', '/images/agent-profile.png', 'Inversión', 4.7, 98, 0),
('550e8400-e29b-41d4-a716-446655440005', 'Laura Fernández', 'laura.fernandez@inmoplus.com', '+34 600 555 555', '/images/agent-profile.png', 'Nuevas Construcciones', 4.5, 73, 0)
ON CONFLICT (id) DO NOTHING;

-- ===== DATOS DE PROPIEDADES =====
INSERT INTO properties (id, title, price, location, city, address, image, images, bedrooms, bathrooms, area, type, operation, description, features, furnished, parking, agent_id, coordinates, featured) VALUES
-- Propiedades Destacadas
('660e8400-e29b-41d4-a716-446655440001', 'Casa Moderna en el Centro', 450000, 'Centro Histórico', 'Madrid', 'Calle Mayor 123', '/images/modern-villa.jpg', ARRAY['/images/modern-villa.jpg', '/images/modern-interior.jpg', '/images/garden-house.jpg'], 4, 3, 180, 'casa', 'venta', 'Hermosa casa moderna en el corazón de Madrid con acabados de lujo y excelente ubicación. Cuenta con terraza privada, jardín y garaje.', ARRAY['Terraza', 'Jardín', 'Garaje', 'Aire Acondicionado', 'Calefacción'], true, true, '550e8400-e29b-41d4-a716-446655440001', '{"lat": 40.4168, "lng": -3.7038}', true),

('660e8400-e29b-41d4-a716-446655440002', 'Apartamento de Lujo en Salamanca', 2800, 'Salamanca', 'Madrid', 'Calle Velázquez 45', '/images/modern-interior.jpg', ARRAY['/images/modern-interior.jpg', '/images/modern-villa.jpg', '/images/coastal-bay.jpg'], 3, 2, 120, 'apartamento', 'alquiler', 'Apartamento de lujo en la zona más exclusiva de Madrid con vistas espectaculares. Incluye piscina, gimnasio y portero 24h.', ARRAY['Piscina', 'Gimnasio', 'Portero 24h', 'Aire Acondicionado', 'Calefacción'], true, true, '550e8400-e29b-41d4-a716-446655440002', '{"lat": 40.4168, "lng": -3.7038}', true),

('660e8400-e29b-41d4-a716-446655440003', 'Oficina Ejecutiva en Diagonal', 1800, 'Centro de Negocios', 'Barcelona', 'Avenida Diagonal 500', '/images/colonial-building.jpg', ARRAY['/images/colonial-building.jpg', '/images/modern-minimalist.jpg'], 0, 2, 80, 'oficina', 'alquiler', 'Oficina ejecutiva en el centro financiero de Barcelona con todas las comodidades. Ideal para empresas en crecimiento.', ARRAY['Recepción', 'Sala de reuniones', 'Parking', 'Aire Acondicionado', 'Internet de alta velocidad'], false, true, '550e8400-e29b-41d4-a716-446655440003', '{"lat": 41.3851, "lng": 2.1734}', false),

-- Propiedades Adicionales
('660e8400-e29b-41d4-a716-446655440004', 'Casa Familiar en las Afueras', 320000, 'Residencial Norte', 'Madrid', 'Calle de la Paz 78', '/images/american-cottage.jpg', ARRAY['/images/american-cottage.jpg', '/images/field-cottage.jpg'], 5, 4, 220, 'casa', 'venta', 'Casa familiar espaciosa en zona residencial tranquila. Perfecta para familias grandes con jardín amplio.', ARRAY['Jardín Amplio', 'Garaje Doble', 'Trastero', 'Calefacción', 'Aire Acondicionado'], true, true, '550e8400-e29b-41d4-a716-446655440001', '{"lat": 40.4168, "lng": -3.7038}', false),

('660e8400-e29b-41d4-a716-446655440005', 'Apartamento Céntrico', 1900, 'Centro', 'Barcelona', 'Carrer de Balmes 25', '/images/european-street.jpg', ARRAY['/images/european-street.jpg', '/images/urban-street.jpg'], 2, 1, 75, 'apartamento', 'alquiler', 'Apartamento céntrico y luminoso en el corazón de Barcelona. Ideal para parejas o profesionales.', ARRAY['Balcón', 'Ascensor', 'Calefacción', 'Internet'], true, false, '550e8400-e29b-41d4-a716-446655440003', '{"lat": 41.3851, "lng": 2.1734}', false),

('660e8400-e29b-41d4-a716-446655440006', 'Local Comercial en Zona Premium', 2500, 'Centro Comercial', 'Madrid', 'Gran Vía 150', '/images/plaza-espana.jpg', ARRAY['/images/plaza-espana.jpg', '/images/cathedral-night.jpg'], 0, 1, 120, 'local', 'alquiler', 'Local comercial en zona de alto tránsito. Perfecto para restaurantes, tiendas o servicios.', ARRAY['Trastero', 'Aire Acondicionado', 'Alarma', 'Escaparate'], false, false, '550e8400-e29b-41d4-a716-446655440002', '{"lat": 40.4168, "lng": -3.7038}', false),

('660e8400-e29b-41d4-a716-446655440007', 'Casa de Campo con Vistas', 680000, 'Sierra de Madrid', 'Madrid', 'Camino de la Sierra 45', '/images/mountain-chalet.jpg', ARRAY['/images/mountain-chalet.jpg', '/images/forest-aframe.jpg'], 6, 4, 350, 'casa', 'venta', 'Casa de campo espectacular con vistas a la sierra. Ideal para quienes buscan tranquilidad y naturaleza.', ARRAY['Piscina', 'Jardín', 'Garaje', 'Chimenea', 'Terraza'], true, true, '550e8400-e29b-41d4-a716-446655440004', '{"lat": 40.4168, "lng": -3.7038}', true),

('660e8400-e29b-41d4-a716-446655440008', 'Apartamento de Diseño', 3200, 'Barrio de Salamanca', 'Madrid', 'Calle de Serrano 89', '/images/scandinavian-house.jpg', ARRAY['/images/scandinavian-house.jpg', '/images/modern-minimalist.jpg'], 3, 2, 95, 'apartamento', 'alquiler', 'Apartamento de diseño con decoración escandinava. Acabados de alta calidad y distribución moderna.', ARRAY['Diseño Escandinavo', 'Aire Acondicionado', 'Calefacción', 'Ascensor', 'Portero'], true, true, '550e8400-e29b-41d4-a716-446655440005', '{"lat": 40.4168, "lng": -3.7038}', false),

('660e8400-e29b-41d4-a716-446655440009', 'Oficina en Torre Empresarial', 2200, 'Distrito Financiero', 'Barcelona', 'Avinguda Diagonal 640', '/images/modern-villa.jpg', ARRAY['/images/modern-villa.jpg', '/images/colonial-building.jpg'], 0, 3, 150, 'oficina', 'alquiler', 'Oficina en torre empresarial con vistas panorámicas. Espacios de trabajo colaborativo y salas de reuniones.', ARRAY['Vistas Panorámicas', 'Sala de Reuniones', 'Cafetería', 'Parking', 'Seguridad 24h'], false, true, '550e8400-e29b-41d4-a716-446655440003', '{"lat": 41.3851, "lng": 2.1734}', false),

('660e8400-e29b-41d4-a716-446655440010', 'Terreno Urbanizable', 150000, 'Zona de Expansión', 'Madrid', 'Carretera de Toledo Km 15', '/images/field-cottage.jpg', ARRAY['/images/field-cottage.jpg'], 0, 0, 500, 'terreno', 'venta', 'Terreno urbanizable en zona de expansión. Permisos de construcción aprobados para vivienda unifamiliar.', ARRAY['Urbanizable', 'Acceso por Carretera', 'Servicios Básicos', 'Permisos Aprobados'], false, false, '550e8400-e29b-41d4-a716-446655440001', '{"lat": 40.4168, "lng": -3.7038}', false),

('660e8400-e29b-41d4-a716-446655440011', 'Casa Adosada Familiar', 280000, 'Residencial Sur', 'Madrid', 'Calle de la Alegría 12', '/images/log-cabin.jpg', ARRAY['/images/log-cabin.jpg', '/images/treehouse-cabin.jpg'], 4, 3, 160, 'casa', 'venta', 'Casa adosada familiar en urbanización tranquila. Zona residencial con buenos colegios y servicios.', ARRAY['Jardín Privado', 'Garaje', 'Trastero', 'Calefacción', 'Aire Acondicionado'], true, true, '550e8400-e29b-41d4-a716-446655440004', '{"lat": 40.4168, "lng": -3.7038}', false),

('660e8400-e29b-41d4-a716-446655440012', 'Apartamento en la Playa', 3500, 'Barceloneta', 'Barcelona', 'Passeig Marítim 25', '/images/coastal-bay.jpg', ARRAY['/images/coastal-bay.jpg', '/images/cliff-houses.jpg'], 2, 2, 85, 'apartamento', 'alquiler', 'Apartamento con vistas al mar en el barrio de la Barceloneta. A pocos metros de la playa y del centro.', ARRAY['Vistas al Mar', 'Terraza', 'Ascensor', 'Calefacción', 'Aire Acondicionado'], true, false, '550e8400-e29b-41d4-a716-446655440005', '{"lat": 41.3851, "lng": 2.1734}', true),

-- Propiedades en Bilbao
('660e8400-e29b-41d4-a716-446655440013', 'Apartamento en el Casco Viejo', 1800, 'Casco Viejo', 'Bilbao', 'Calle Somera 15', '/images/european-street.jpg', ARRAY['/images/european-street.jpg', '/images/colonial-building.jpg'], 2, 1, 65, 'apartamento', 'alquiler', 'Encantador apartamento en el corazón del Casco Viejo de Bilbao. Cerca de todos los servicios y transporte público.', ARRAY['Balcón', 'Ascensor', 'Calefacción', 'Internet'], true, false, '550e8400-e29b-41d4-a716-446655440001', '{"lat": 43.2627, "lng": -2.9253}', false),

('660e8400-e29b-41d4-a716-446655440014', 'Casa Moderna en Indautxu', 420000, 'Indautxu', 'Bilbao', 'Calle Licenciado Poza 25', '/images/modern-villa.jpg', ARRAY['/images/modern-villa.jpg', '/images/modern-interior.jpg'], 3, 2, 140, 'casa', 'venta', 'Casa moderna en una de las mejores zonas de Bilbao. Cerca del parque de Doña Casilda y del centro comercial.', ARRAY['Terraza', 'Garaje', 'Trastero', 'Aire Acondicionado', 'Calefacción'], true, true, '550e8400-e29b-41d4-a716-446655440002', '{"lat": 43.2627, "lng": -2.9253}', true),

('660e8400-e29b-41d4-a716-446655440015', 'Oficina en Ensanche', 1600, 'Ensanche', 'Bilbao', 'Gran Vía 45', '/images/colonial-building.jpg', ARRAY['/images/colonial-building.jpg', '/images/modern-minimalist.jpg'], 0, 2, 90, 'oficina', 'alquiler', 'Oficina en el centro financiero de Bilbao. Ideal para empresas que buscan una ubicación céntrica y profesional.', ARRAY['Recepción', 'Sala de reuniones', 'Parking', 'Aire Acondicionado', 'Internet de alta velocidad'], false, true, '550e8400-e29b-41d4-a716-446655440003', '{"lat": 43.2627, "lng": -2.9253}', false),

('660e8400-e29b-41d4-a716-446655440016', 'Local Comercial en Deusto', 2000, 'Deusto', 'Bilbao', 'Calle Lehendakari Aguirre 78', '/images/plaza-espana.jpg', ARRAY['/images/plaza-espana.jpg', '/images/cathedral-night.jpg'], 0, 1, 100, 'local', 'alquiler', 'Local comercial en zona universitaria de Deusto. Alto tránsito de estudiantes y residentes.', ARRAY['Trastero', 'Aire Acondicionado', 'Alarma', 'Escaparate'], false, false, '550e8400-e29b-41d4-a716-446655440004', '{"lat": 43.2627, "lng": -2.9253}', false),

('660e8400-e29b-41d4-a716-446655440017', 'Apartamento de Lujo en Abando', 2800, 'Abando', 'Bilbao', 'Calle Alameda de Urquijo 12', '/images/scandinavian-house.jpg', ARRAY['/images/scandinavian-house.jpg', '/images/modern-minimalist.jpg'], 3, 2, 110, 'apartamento', 'alquiler', 'Apartamento de lujo en la zona más exclusiva de Bilbao. Vistas al río Nervión y cerca del Guggenheim.', ARRAY['Vistas al Río', 'Terraza', 'Ascensor', 'Portero 24h', 'Gimnasio'], true, true, '550e8400-e29b-41d4-a716-446655440005', '{"lat": 43.2627, "lng": -2.9253}', true)
ON CONFLICT (id) DO NOTHING;

-- ===== DATOS DE USUARIOS DE EJEMPLO =====
INSERT INTO users (id, name, email, phone, role, avatar) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'Juan Pérez', 'juan.perez@email.com', '+34 600 111 222', 'client', '/images/placeholder-user.jpg'),
('770e8400-e29b-41d4-a716-446655440002', 'María González', 'maria.gonzalez@email.com', '+34 600 333 444', 'client', '/images/placeholder-user.jpg'),
('770e8400-e29b-41d4-a716-446655440003', 'Carlos Silva', 'carlos.silva@email.com', '+34 600 555 666', 'client', '/images/placeholder-user.jpg'),
('770e8400-e29b-41d4-a716-446655440004', 'Ana Rodríguez', 'ana.rodriguez@email.com', '+34 600 777 888', 'client', '/images/placeholder-user.jpg'),
('770e8400-e29b-41d4-a716-446655440005', 'Luis Fernández', 'luis.fernandez@email.com', '+34 600 999 000', 'client', '/images/placeholder-user.jpg')
ON CONFLICT (id) DO NOTHING;

-- ===== DATOS DE FAVORITOS DE EJEMPLO =====
INSERT INTO favorites (user_id, property_id) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'),
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440007'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004'),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005'),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440012')
ON CONFLICT (user_id, property_id) DO NOTHING;

-- ===== DATOS DE CITAS DE EJEMPLO =====
INSERT INTO appointments (property_id, client_name, client_email, client_phone, date, time, message, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Juan Pérez', 'juan.perez@email.com', '+34 600 111 222', '2025-01-15', '10:00', 'Me interesa mucho esta propiedad. ¿Podría verla este sábado?', 'confirmed'),
('660e8400-e29b-41d4-a716-446655440002', 'María González', 'maria.gonzalez@email.com', '+34 600 333 444', '2025-01-16', '14:00', 'Busco un apartamento para alquilar. ¿Está disponible para visitar?', 'pending'),
('660e8400-e29b-41d4-a716-446655440003', 'Carlos Silva', 'carlos.silva@email.com', '+34 600 555 666', '2025-01-17', '16:00', 'Necesito una oficina para mi empresa. ¿Podría mostrarme el espacio?', 'confirmed'),
('660e8400-e29b-41d4-a716-446655440007', 'Ana Rodríguez', 'ana.rodriguez@email.com', '+34 600 777 888', '2025-01-18', '11:00', 'Me encanta la casa de campo. ¿Podría visitarla con mi familia?', 'pending'),
('660e8400-e29b-41d4-a716-446655440012', 'Luis Fernández', 'luis.fernandez@email.com', '+34 600 999 000', '2025-01-19', '15:00', 'Busco un apartamento cerca de la playa. ¿Está disponible?', 'confirmed')
ON CONFLICT DO NOTHING;

-- ===== DATOS DE MENSAJES DE CONTACTO DE EJEMPLO =====
INSERT INTO contact_messages (property_id, agent_id, client_name, client_email, client_phone, message) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Juan Pérez', 'juan.perez@email.com', '+34 600 111 222', 'Hola, me interesa mucho esta casa. ¿Podría enviarme más información sobre las características y el proceso de compra?'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'María González', 'maria.gonzalez@email.com', '+34 600 333 444', 'Buenos días, estoy buscando un apartamento para alquilar. ¿Este está disponible inmediatamente?'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Carlos Silva', 'carlos.silva@email.com', '+34 600 555 666', 'Hola, necesito una oficina para mi startup. ¿Podría enviarme más detalles sobre el espacio y los servicios incluidos?'),
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440004', 'Ana Rodríguez', 'ana.rodriguez@email.com', '+34 600 777 888', 'Me encanta esta casa de campo. ¿Podría informarme sobre las características del terreno y las posibilidades de reforma?'),
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440005', 'Luis Fernández', 'luis.fernandez@email.com', '+34 600 999 000', 'Hola, busco un apartamento cerca de la playa. ¿Este tiene vistas al mar? ¿Cuál es la duración mínima del contrato?')
ON CONFLICT DO NOTHING;

-- ===== DATOS DE PREGUNTAS FRECUENTES (FAQs) =====
INSERT INTO faqs (question, answer, order_index) VALUES
('¿Cómo puedo publicar mi propiedad en InmoPlus?', 'Publicar tu propiedad es muy sencillo. Solo necesitas registrarte como agente o propietario, completar el formulario con los detalles de tu propiedad, subir fotos de alta calidad y nuestro equipo revisará la publicación antes de hacerla visible en la plataforma.', 0),
('¿Cuáles son las comisiones por vender una propiedad?', 'Nuestras comisiones son competitivas y transparentes. Para ventas, cobramos entre 3% y 5% del valor de la transacción, dependiendo del tipo de propiedad y servicios adicionales. Para alquileres, la comisión es equivalente a un mes de renta.', 1),
('¿Ofrecen servicios de financiamiento?', 'Sí, trabajamos con una red de bancos y entidades financieras para ayudarte a obtener el mejor financiamiento. Nuestros asesores pueden guiarte en el proceso de pre-aprobación y encontrar las mejores tasas de interés disponibles.', 2),
('¿Cómo puedo agendar una visita a una propiedad?', 'Puedes agendar una visita directamente desde la página de la propiedad haciendo clic en "Agendar Visita". Selecciona la fecha y hora que prefieras, y el agente responsable se pondrá en contacto contigo para confirmar la cita.', 3),
('¿Qué documentos necesito para comprar una propiedad?', 'Los documentos básicos incluyen: identificación oficial, comprobantes de ingresos, estados de cuenta bancarios, carta de pre-aprobación de crédito (si aplica), y comprobante de domicilio. Nuestro equipo te guiará con la lista completa según tu situación específica.', 4),
('¿Manejan propiedades comerciales además de residenciales?', 'Absolutamente. Manejamos todo tipo de propiedades: residenciales (casas, apartamentos), comerciales (oficinas, locales, bodegas), industriales y terrenos. Tenemos agentes especializados en cada sector para brindarte el mejor servicio.', 5)
ON CONFLICT DO NOTHING;

-- ===== ACTUALIZAR CONTADORES DE PROPIEDADES DE AGENTES =====
UPDATE agents SET properties_count = (
  SELECT COUNT(*) FROM properties WHERE agent_id = agents.id
); 