import React from 'react';

import { PageNotFoundIllustration } from '../assets/svg';
import { LinkButton } from '../components/ui/button';

const Page404: React.FC = () => (
  <div className="flex h-screen w-screen items-center justify-center ">
    <div className="flex h-1/2 max-w-lg flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold">Sorry, page not found!</h1>
      <p className="mb-20 text-base text-[#637381]">
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
        your spelling.
      </p>
      <PageNotFoundIllustration className="mb-20" />
      <LinkButton>Go to Home</LinkButton>
    </div>
  </div>
);

export default Page404;
