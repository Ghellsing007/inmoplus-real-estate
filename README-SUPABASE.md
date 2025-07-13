# 🏠 InmoPlus - Integración con Supabase

## 📋 Configuración Completa de Supabase

### 1. 🚀 Configuración Inicial

#### Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://eqqjimughdscmbsbiwcj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcWppbXVnaGRzY21ic2Jpd2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNjUyNTUsImV4cCI6MjA2Nzk0MTI1NX0.vYnDG997OSz70JcPZVhLJ01Vprl-fUGyiCvQs-WXw5Y

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. 🗄️ Configuración de la Base de Datos

#### Paso 1: Acceder a Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Accede al proyecto: `eqqjimughdscmbsbiwcj`

#### Paso 2: Ejecutar el Script SQL
1. Ve a la sección **SQL Editor** en el panel de Supabase
2. Copia y pega el contenido del archivo `supabase-schema.sql`
3. Ejecuta el script completo

#### Paso 3: Verificar las Tablas Creadas
El script creará las siguientes tablas:
- ✅ `users` - Usuarios del sistema
- ✅ `agents` - Agentes inmobiliarios
- ✅ `properties` - Propiedades inmobiliarias
- ✅ `appointments` - Citas para visitas
- ✅ `contact_messages` - Mensajes de contacto
- ✅ `favorites` - Propiedades favoritas

### 3. 🔐 Configuración de Autenticación

#### Habilitar Autenticación por Email
1. Ve a **Authentication > Settings**
2. Habilita **Email auth**
3. Configura las opciones de confirmación de email

#### Configurar Redirecciones
En **Authentication > URL Configuration**:
- **Site URL**: `http://localhost:3000` (desarrollo)
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/reset-password`

### 4. 🛡️ Configuración de Seguridad (RLS)

El script SQL ya incluye las políticas de seguridad RLS (Row Level Security):

#### Políticas Implementadas:
- **Usuarios**: Solo pueden ver/editar su propio perfil
- **Agentes**: Lectura pública, edición propia
- **Propiedades**: Lectura pública, gestión por agente
- **Citas**: Creación pública, visualización por usuario/agente
- **Mensajes**: Creación pública, visualización por agente
- **Favoritos**: Gestión completa por usuario

### 5. 📊 Datos de Ejemplo

El script incluye datos de ejemplo:
- **3 Agentes** con diferentes especializaciones
- **3 Propiedades** de diferentes tipos y ubicaciones

### 6. 🔧 Funcionalidades Implementadas

#### ✅ Autenticación Completa
- Registro de usuarios
- Inicio de sesión
- Gestión de perfiles
- Cerrar sesión

#### ✅ Gestión de Propiedades
- Listado de propiedades
- Filtros avanzados
- Detalles de propiedad
- Propiedades destacadas

#### ✅ Sistema de Favoritos
- Agregar/remover favoritos
- Lista de favoritos por usuario
- Estado persistente

#### ✅ Gestión de Citas
- Crear citas para visitas
- Estado de citas (pendiente/confirmada/cancelada)
- Historial por usuario y agente

#### ✅ Mensajes de Contacto
- Envío de mensajes a agentes
- Historial de mensajes
- Notificaciones

### 7. 🚀 Uso de los Hooks

#### useAuth Hook
```typescript
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, profile, signIn, signUp, signOut } = useAuth()
  
  // Verificar si está autenticado
  if (!user) return <div>No autenticado</div>
  
  return <div>Bienvenido {profile?.name}</div>
}
```

#### useFavorites Hook
```typescript
import { useFavorites } from '@/hooks/useFavorites'

function PropertyCard({ id }) {
  const { isFavorited, toggleFavorite } = useFavorites()
  
  return (
    <button onClick={() => toggleFavorite(id)}>
      {isFavorited(id) ? '❤️' : '🤍'}
    </button>
  )
}
```

### 8. 📱 Componentes Actualizados

#### Navbar
- ✅ Integración con autenticación
- ✅ Modal de login/registro
- ✅ Menú de usuario dinámico
- ✅ Estados de carga

#### PropertyCard
- ✅ Sistema de favoritos integrado
- ✅ Verificación de autenticación
- ✅ Estados visuales actualizados

#### AuthModal
- ✅ Formularios de login y registro
- ✅ Validaciones completas
- ✅ Manejo de errores
- ✅ Estados de carga

### 9. 🔄 Servicios Disponibles

#### userService
```typescript
import { userService } from '@/lib/services'

// Crear usuario
await userService.createUser(userData)

// Obtener usuario
const user = await userService.getUserById(id)

// Actualizar usuario
await userService.updateUser(id, updates)
```

#### propertyService
```typescript
import { propertyService } from '@/lib/services'

// Obtener todas las propiedades
const properties = await propertyService.getAllProperties()

// Filtrar propiedades
const filtered = await propertyService.getPropertiesWithFilters({
  city: 'Madrid',
  minPrice: 100000,
  maxPrice: 500000
})
```

#### appointmentService
```typescript
import { appointmentService } from '@/lib/services'

// Crear cita
await appointmentService.createAppointment(appointmentData)

// Obtener citas por propiedad
const appointments = await appointmentService.getAppointmentsByProperty(propertyId)
```

### 10. 🐛 Solución de Problemas

#### Error de Conexión
```bash
# Verificar variables de entorno
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### Error de RLS
- Verificar que las políticas estén creadas
- Comprobar que el usuario esté autenticado
- Revisar los logs en Supabase

#### Error de Autenticación
- Verificar configuración de email en Supabase
- Comprobar redirecciones configuradas
- Revisar logs de autenticación

### 11. 📈 Próximos Pasos

#### Funcionalidades Sugeridas:
1. **Sistema de Notificaciones**
   - Email automático para citas
   - Notificaciones push

2. **Panel de Administración**
   - Gestión de agentes
   - Estadísticas de propiedades

3. **Sistema de Pagos**
   - Integración con Stripe
   - Reservas con pago

4. **Mapas Interactivos**
   - Google Maps integration
   - Búsqueda por ubicación

5. **Sistema de Reviews**
   - Calificaciones de agentes
   - Comentarios de propiedades

### 12. 📞 Soporte

Para cualquier problema o duda:
1. Revisa los logs en Supabase
2. Verifica la configuración de variables de entorno
3. Comprueba que todas las tablas estén creadas
4. Revisa las políticas de seguridad RLS

¡Tu proyecto InmoPlus está listo para funcionar con Supabase! 🎉 