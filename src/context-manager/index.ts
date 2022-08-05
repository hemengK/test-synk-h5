import React from 'react';

const defaultContext = {};

const context = React.createContext<Record<string, any>>(defaultContext);

export default context;
