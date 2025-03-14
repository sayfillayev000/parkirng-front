import { NavLink, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error?.status === 404) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
        <p className="text-lg mb-8">
          The page you are looking for does not exist.
        </p>
        <NavLink to="/" className="btn btn-primary">
          Go Home
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg mb-8">Something went wrong.</p>
        <p className="text-lg mb-8">{error?.message}</p>
        <NavLink to="/" className="btn btn-primary">
          Go Home
        </NavLink>
      </div>
    );
  }
};

export default Error;
