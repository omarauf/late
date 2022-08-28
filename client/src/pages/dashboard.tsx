import React from 'react';

import { Button } from '../components/ui/button';
import { notify } from '../components/ui/toast';

const Dashboard: React.FC = () => (
  <div>
    <Button onClick={() => notify('Title', 'life need fuck')}>Make me a toast</Button>
    <div className="mt-5">
      <Button onClick={() => notify('Title', 'life need fuck', true)}>Make me a Wrong</Button>
    </div>
  </div>
);

export default Dashboard;
