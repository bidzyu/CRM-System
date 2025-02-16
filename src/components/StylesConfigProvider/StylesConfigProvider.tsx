import { ConfigProvider } from 'antd';
import React from 'react';

interface StylesConfigProvider {
  children: React.ReactElement;
}

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  colorBgContainer: string;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const defaultData: ThemeData = {
  borderRadius: 4,
  colorPrimary: '#7F265B',
  colorBgContainer: '#eee',
};

const StylesConfigProvider: React.FC<StylesConfigProvider> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: defaultData.colorPrimary,
          borderRadius: defaultData.borderRadius,

          // Alias Token
          colorBgContainer: defaultData.colorBgContainer,
        },
        components: {
          Input: {
            colorBgContainer: 'transparent',
          },
          Button: {
            primaryShadow: 'none',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default StylesConfigProvider;
