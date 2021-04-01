import React, { useState, useEffect, useContext } from "react";

import { ContextApp } from "../../contextStore/context";

const clgComponentName = (WrappedComponent, name) => (props) => {
    const [componentName] = useState(name);
    const { appState } = useContext(ContextApp);

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName} => withHOC`);
    }, []);

    return <WrappedComponent data={componentName} {...props} />;
};

export default clgComponentName;
