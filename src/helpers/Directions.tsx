// import React from 'react';
import { PropsWithChildren } from 'react';
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// import { prefixer } from 'stylis';


function Directions(props: PropsWithChildren<any>) {


    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [ rtlPlugin],
    });


    return <CacheProvider value={cacheRtl}>
        <StyleSheetManager stylisPlugins={[rtlPlugin]}>
            {props.children}
        </StyleSheetManager>
    </CacheProvider>;
}

export default Directions;
