This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Sistema de Reservas de Autos

## Correcciones y Mejoras en el Sistema de Checkout

### Problemas Identificados

1. **Inconsistencia en los Nombres de Parámetros**
   - El componente `ModalAddReservation` enviaba `startDay` y `endtDay`
   - El endpoint `/api/checkout` esperaba `startDate` y `endDate`
   - Esta inconsistencia causaba que los datos no se procesaran correctamente

2. **Versión Incorrecta de la API de Stripe**
   - La versión configurada era `2025-05-28.basil` (futura e inválida)
   - Esto causaba errores al intentar crear sesiones de pago

3. **Manejo Inadecuado de Errores**
   - No había validación de campos requeridos
   - No se validaba el formato de las fechas
   - No se manejaban correctamente los errores en el cliente

4. **Cálculo Incorrecto del Monto para Stripe**
   - El monto no se convertía correctamente a centavos
   - Esto causaba problemas al procesar los pagos

### Cambios Realizados

1. **En el Componente ModalAddReservation**
   ```typescript
   // Antes
   startDay: dateSelected.from.toISOString(),
   endtDay: dateSelected.to.toISOString(),
   
   // Después
   startDate: dateSelected.from.toISOString(),
   endDate: dateSelected.to.toISOString(),
   ```
   - Corrección de nombres de parámetros
   - Mejora en el manejo de errores con try-catch
   - Mejores mensajes de feedback al usuario
   - Validación más robusta de las fechas seleccionadas

2. **En la Configuración de Stripe**
   ```typescript
   // Antes
   apiVersion: "2025-05-28.basil",
   
   // Después
   apiVersion: "2023-10-16",
   ```
   - Actualización a una versión válida de la API
   - Configuración correcta para TypeScript

3. **En el Endpoint de Checkout**
   ```typescript
   // Nuevas validaciones
   if (!carId || !priceDay || !startDate || !endDate || !carName) {
     return new NextResponse("Missing required fields", { status: 400 });
   }

   if (isNaN(start.getTime()) || isNaN(end.getTime())) {
     return new NextResponse("Invalid date format", { status: 400 });
   }

   if (numberOdDays <= 0) {
     return new NextResponse("Invalid date range", { status: 400 });
   }
   ```
   - Validación completa de campos requeridos
   - Validación de formato de fechas
   - Validación de rango de fechas
   - Manejo de errores con try-catch
   - Mejor formato de metadatos para Stripe

4. **Cálculo Correcto del Monto**
   ```typescript
   // Antes
   const totalAmountStripe = Number(priceDay) * 100 * numberOdDays;
   
   // Después
   const totalAmount = Number(priceDay) * numberOdDays;
   const totalAmountStripe = Math.round(totalAmount * 100);
   ```
   - Cálculo más preciso del monto total
   - Conversión correcta a centavos para Stripe

### Mejoras en la Experiencia de Usuario

1. **Mensajes de Error más Claros**
   - Validación de fechas antes de enviar la solicitud
   - Mensajes de error específicos para cada tipo de problema
   - Feedback visual con toasts para el usuario

2. **Manejo de Errores más Robusto**
   - Try-catch en el cliente y servidor
   - Logging de errores para debugging
   - Respuestas HTTP apropiadas

3. **Validación de Datos**
   - Verificación de campos requeridos
   - Validación de formato de fechas
   - Validación de rangos de fechas
   - Verificación de existencia del carro

### Flujo de Trabajo Actualizado

1. El usuario selecciona las fechas en el calendario
2. El componente valida las fechas antes de enviar
3. Se envían los datos al endpoint con los nombres correctos
4. El servidor valida todos los campos
5. Se calcula el monto correctamente
6. Se crea la sesión de Stripe con los datos validados
7. Se redirige al usuario a la página de pago
8. Se manejan los errores en cada paso

### Consideraciones Técnicas

1. **Seguridad**
   - Validación de usuario autenticado
   - Validación de datos en el servidor
   - Manejo seguro de montos monetarios

2. **Rendimiento**
   - Validaciones tempranas para evitar procesamiento innecesario
   - Manejo eficiente de fechas
   - Cálculos precisos de montos

3. **Mantenibilidad**
   - Código más organizado y documentado
   - Mejor manejo de errores
   - Validaciones claras y específicas

### Próximos Pasos Recomendados

1. Implementar pruebas unitarias para las validaciones
2. Agregar más logs para debugging
3. Mejorar la documentación de la API
4. Implementar un sistema de monitoreo de errores
5. Considerar la implementación de un sistema de caché para las consultas de carros
