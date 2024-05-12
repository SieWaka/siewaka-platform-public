import { UserRole } from '@prisma/client';
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import AdminLayout from '../../../../components/organisms/Layout/AdminLayout';
import Tabs from '../../../../components/molecules/Tabs';
import {
  DetailsTab,
  DevicesTab,
  SamplesTab,
} from '../../../../components/organisms/Admin/SamplingPointsAdmin';
import axiosFromServerSideProps from '../../../../utils/axiosFromServerSideProps';
import { GetSampleResponse } from '../../../../model/sample';
import { GetDeviceResponse } from '../../../../model/device';
import { GetSamplingPointResponse } from '../../../../model/samplingPoint';
import { useAuthenticatedUser } from '../../../../hooks/useAuthenticatedUser';
import { GetCountriesResponse } from '../../../../model/country';

export interface GetSamplingPointResponseWithSamples
  extends GetSamplingPointResponse {
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    organizationName: string;
  };
  samples: GetSampleResponse[];
  devices: GetDeviceResponse[];
}

interface ServerSideProps {
  samplingPoint: GetSamplingPointResponseWithSamples;
  countries: GetCountriesResponse;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const { id } = ctx.query;

  try {
    const samplingPointWithSamples: GetSamplingPointResponseWithSamples =
      await (
        await axiosFromServerSideProps(ctx)
      )
        .get(`/api/sampling-points/${id}`, {
          params: { withDevices: true, withOwnerData: true },
        })
        .then(async (res) => {
          // Include the samples data in the samplingPoint object
          const samplingPoint = res.data;
          const samples = await (await axiosFromServerSideProps(ctx))
            .get(`/api/sampling-points/${id}/samples`)
            .then((res) => res.data.samples);

          return {
            ...samplingPoint,
            samples: samples,
          };
        });

    const countries: GetCountriesResponse = await (
      await axiosFromServerSideProps(ctx)
    )
      .get(`/api/countries`)
      .then((res) => res.data);

    return {
      props: {
        samplingPoint: JSON.parse(JSON.stringify(samplingPointWithSamples)),
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

const EditSamplingPointPage: NextPage<ServerSideProps> = ({
  samplingPoint,
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useAuthenticatedUser();

  const isUserOwner = samplingPoint.ownerId === user?.id;
  const isUserAdmin = user?.role === UserRole.ADMIN;
  const isAbleToPerformActions = isUserAdmin || isUserOwner;

  return (
    <AdminLayout
      backButton={{
        redirectTo: '/admin/sampling-points',
      }}
      title={samplingPoint.name}
    >
      <div className="h-full flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-2xl overflow-x-auto">
          {
            <Tabs
              headers={['Info general', 'Muestras', 'Módulos autofijados']}
              content={[
                <DetailsTab
                  key="datil-tab-content"
                  isAbleToPerformActions={isAbleToPerformActions}
                  samplingPoint={samplingPoint}
                  countries={countries}
                />,
                <SamplesTab
                  key="sample-tab-content"
                  isAbleToPerformActions={isAbleToPerformActions}
                  samplingPoint={samplingPoint}
                />,
                <DevicesTab
                  key="devices-tab-content"
                  isAbleToPerformActions={isAbleToPerformActions}
                  samplingPoint={samplingPoint}
                />,
              ]}
            />
          }
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditSamplingPointPage;
