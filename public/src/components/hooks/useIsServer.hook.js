import { useState, useEffect } from 'react';

const useIsServer = () => {
    return typeof window !== 'undefined' ? false : true;
};

export default useIsServer;
