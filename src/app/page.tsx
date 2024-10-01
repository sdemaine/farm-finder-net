import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ModalMenu } from 'src/components/shared/menu/ModalMenu';
import { ConfigMenuModal } from 'src/components/shared/menu/ConfigMenuModal';

const MapComponent = dynamic(() => import('src/components/shared/Map'), {
  ssr: false,
  loading: () => <div>Loading Map...</div>
});

export default function Home() {
  return (
    <>
      <MapComponent />
    </>
  );
}
