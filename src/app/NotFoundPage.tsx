import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold text-text mt-4">Página no encontrada</h1>
      <p className="text-text-secondary mt-2">La ruta que buscas no existe.</p>
      <Button onClick={() => navigate('/')} className="mt-6">
        Volver al inicio
      </Button>
    </div>
  );
}
