import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [formState, setFormState] = useState({ addressTo: null, active: false });

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { addressTo, active } = formState;

  return (
    <Grid.Column width={16}>
      <h1>Account Redirect Module</h1>
      <Form>
        <Form.Field>
          <Input
            label='Redirect Address'
            state='addressTo'
            placeholder='address'
            type='text'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Activate?'
            state='active'
            type='checkbox'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Set Redirect'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'accountRedirect',
              inputParams: [addressTo , active],
              // inputParams: [{"AddressTo": addressTo , "Active": active}],
              paramFields: [true, true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function RedirectMod (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule
    ? <Main {...props} /> : null);
}
