import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh grid content-center text-center">
      <h2 className="text-6xl font-bold pb-5">Page not found</h2>
      <Button
        className="text-xl w-fit mx-auto"
        onClick={() => navigate('/', { replace: true })}
      >
        Go back to home
      </Button>
    </div>
  );
};

export default NotFoundPage;
