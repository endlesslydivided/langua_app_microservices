import type { Meta, StoryObj } from '@storybook/react';
import EditTextField from '.';


const meta: Meta<typeof EditTextField> = {
    title: 'EditTextField',
    component: EditTextField,
    tags: ['auth','components'],
    argTypes: {
      initialValues:{
       
      },
      type:{
        control:{
            type:'select'
        },
        defaultValue:'text',
        options:['text','tel','number','email']
      },
      label:{
        control:'text'
      },
      onSubmit:{
        defaultValue: () => {}
      },
      setInitialValues:{
        defaultValue: () => {}
      },
      validationSchema:{
        defaultValue: () => {}
      },
      name:{
        defaultValue:''
      }

    },
};

export default meta;
type Story = StoryObj<typeof EditTextField>;

export const Phone_Number: Story = {
    args: {
        initialValues: {phoneNumber: '+357489586974'},
        label: 'Phone number',
        type:'tel',
        name:'phoneNumber'
    },
};