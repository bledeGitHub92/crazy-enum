# Crazy-Enum

> A simple and easy-to-use enum library for Javascript, with support for management of enums and their values.

## Installation

```bash
# npm
npm install --save crazy-enum
# pnpm
pnpm add crazy-enum
# yarn
yarn add crazy-enum
```

## Motivation

When working with enums, it's often necessary to define a mapping between the values and the string labels. This can be cumbersome and error-prone, especially when working with large enums or when the labels need to be localized.

## Basic Usage

First, import the library and create an enum:

```typescript
import Enum from 'crazy-enum';

const value = {
  ENABLE: 1,
  DISABLE: 0,
};

const description = {
  ENABLE: 'enable', // this value represents the 'enable' value in the enum
  DISABLE: 'disable',
};

export class Status extends Enum(value, description) {
  /*
   *  you can add any custom methods you want here
   */
  get isEnable() {
    return this.id === Status.ENABLE.id;
  }
}
```

Then, you can use the enum in your code:

```typescript
import { Status } from './path/to/your/enum';

Status.get(someValue).name; // returns 'enable'
Status.get(someValue).id; // returns 1
```

## Examples

Here are some more examples of how to use the library:

1. using the `get` method to get the enum description by its value:

```typescript
import * as React from 'react';
import { Descriptions } from 'antd';
import { Status } from './path/to/your/enum';

const App = () => {
  const [status] = React.useState(1);

  return (
    <Descriptions title="basic" column={2}>
      <Descriptions.Item label={'status'}>
        {Status.get(status).name || '-'} // <-- this will return 'enable' if the status is 1
      </Descriptions.Item>
    </Descriptions>
  );
};
```

2. spread the enum values into a react component:

```typescript
import { Select } from 'antd';
import { Status } from './path/to/your/enum';

const App = () => {

  return (
    <Select
      options={[...Status].map((it) => ({ label: it.name, value: it.id }))}
    />
  );
};
```
