import * as yup from 'yup';

export const tournamentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  league_id: yup.string().nullable(),
});
