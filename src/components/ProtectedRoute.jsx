import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { session } = UserAuth();

  console.log(session)

  if (session === undefined) {
    return (
    <div className='flex flex1 h-svh bg-background items-center justify-center'>
      <p className='text-white font-outfit'>Loading...</p>
    </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;