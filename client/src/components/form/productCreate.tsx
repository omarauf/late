import React, { useReducer } from 'react';
import { createProduct } from '../../api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TextArea } from '../ui/textarea';
import { notify } from '../ui/toast';

enum ActionKind {
  name = 'name',
  quantity = 'quantity',
  price = 'price',
  description = 'description',
}

type Action = {
  type: ActionKind;
  payload: number | string;
};

interface IFormState {
  [ActionKind.name]: string;
  [ActionKind.quantity]: number;
  [ActionKind.price]: number;
  [ActionKind.description]: string;
}

const initialCounterState: IFormState = {
  name: '',
  quantity: 0,
  price: 0,
  description: '',
};

const formReducer = (state: IFormState, event: Action): IFormState => ({
  ...state,
  [event.type]: event.payload,
});

export const ProductCreate: React.FC = () => {
  const [formData, setFormData] = useReducer(formReducer, initialCounterState);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await createProduct(formData);
    try {
      notify('Done', `${data.name} has been created successfully`);
    } catch (error) {
      notify('Error', `${error.message}`, true);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <Input name={ActionKind.name} title="Name" placeholder="Gear" onChange={setFormData} />
      </div>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Input
          name={ActionKind.price}
          title="Price"
          type="number"
          placeholder="0.00"
          onChange={setFormData}
        />
        <Input
          name={ActionKind.quantity}
          title="Quantity"
          type="number"
          placeholder="1"
          onChange={setFormData}
        />
      </div>
      <div className="mb-6">
        <TextArea
          name={ActionKind.description}
          title="Description"
          placeholder="Enter a description..."
          onChange={setFormData}
        />
      </div>
      <div className="w-24">
        <Button name="submit" title="Create" type="submit" />
      </div>
    </form>
  );
};
