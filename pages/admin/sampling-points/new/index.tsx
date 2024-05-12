import { ZodError } from 'zod';
import { updateSamplingPointSchema } from '../../../../model/samplingPoint';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useState } from 'react';
import axios from 'axios';
import { AreaType, WaterBodyType } from '@prisma/client';
import AdminLayout from '../../../../components/organisms/Layout/AdminLayout';
import Text from '../../../../components/molecules/Text';
import { SamplingPointForm } from '../../../../components/organisms/Admin/SamplingPointsAdmin';
import { GetCountriesResponse } from '../../../../model/country';
import axiosFromServerSideProps from '../../../../utils/axiosFromServerSideProps';

const initialErrors = {
  name: null,
  latitude: null,
  longitude: null,
  countryId: null,
  description: null,
  waterBodyName: null,
  waterBodyType: null,
  areaType: null,
};

interface ServerSideProps {
  countries: GetCountriesResponse;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const { id } = ctx.query;

  try {
    const countries: GetCountriesResponse = await (
      await axiosFromServerSideProps(ctx)
    )
      .get(`/api/countries`)
      .then((res) => res.data);

    return {
      props: {
        countries: JSON.parse(JSON.stringify(countries)),
      },
    };
  } catch (error) {
    return {
      error: error,
      notFound: true,
    };
  }
};

const CreateSamplingPoint: NextPage<ServerSideProps> = ({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    countryId: '',
    description: '',
    waterBodyName: '',
    waterBodyType: WaterBodyType.LAGO,
    areaType: AreaType.URBANO,
  });

  const [errors, setErrors] =
    useState<Record<keyof typeof data, string | null>>(initialErrors);

  const checkErrors = (): typeof initialErrors => {
    try {
      //validar los datos
      updateSamplingPointSchema.parse(data);
      return initialErrors;
    } catch (e) {
      if (e instanceof ZodError) {
        const err = e;
        // Procesa los errores capturados con ZodError
        const newErrors = Object.keys(initialErrors).reduce((acc, key) => {
          const newError = err.issues.find((issue) => issue.path[0] === key);
          return {
            ...acc,
            [key]: newError?.message ?? null,
          };
        }, {} as typeof initialErrors);
        return newErrors;
      } else {
        console.error(e);
        return initialErrors;
      }
    }
  };

  const handleSubmitForm = async (formData: any) => {
    const errors = checkErrors();
    setErrors(errors);

    try {
      await axios.post(`/api/sampling-points`, formData);
      window.alert('Se creó correctamente');
    } catch (error) {
      window.alert('Hubo un error, vuelve a intentarlo.');
    }
  };

  const initialData = {
    name: '',
    latitude: '',
    longitude: '',
    countryId: '',
    description: '',
    waterBodyName: '',
    waterBodyType: WaterBodyType.LAGO,
    areaType: AreaType.URBANO,
  };

  return (
    <AdminLayout
      backButton={{
        redirectTo: `/admin/sampling-points`,
      }}
      title="Crear punto de toma"
    >
      <div className="flex flex-col space-y-8">
        <Text as="h3">Creando punto de toma</Text>
        <SamplingPointForm
          countries={countries}
          onSubmit={handleSubmitForm}
          initialData={initialData}
          isEditMode={true}
        />
      </div>
    </AdminLayout>
  );
};

export default CreateSamplingPoint;
