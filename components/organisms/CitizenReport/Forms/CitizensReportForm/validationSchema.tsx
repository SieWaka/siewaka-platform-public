import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  latitude: yup.number().required('La latitud es requerida'),
  longitude: yup.number().required('La longitud es requerida'),
  // answers: yup
  //   .object()
  //   .test('valid-measurement-values', 'Los valores de medición no son válidos', (value) => {
  //     if (!value) return true; // Permitir valores nulos (opcional)
  //     return Object.values(value).every((val) => !isNaN(val as number));
  //   }),
});
