import React from 'react';
import PropTypes from 'prop-types';

//hoc
import clgComponentName from '../hoc/consoleComponentName';

interface iButtonProps {
    children?: React.ReactNode;
    customClass?: string;
    clicked?: (e?: any) => void;
    title: string;
    isLoading?: boolean;
    attributes?: Record<string, unknown>;
}

const Button: React.FC<iButtonProps> = ({
    children,
    customClass,
    clicked,
    title,
    isLoading,
    attributes,
}): JSX.Element => {
    return (
        <button
            title={title}
            className={`button ${customClass} ${isLoading ? 'disabled' : ''}`}
            onClick={clicked && ((e) => clicked(e))}
            disabled={isLoading}
            {...attributes}
        >
            {children} {title}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.element,
    customClass: PropTypes.string,
    clicked: PropTypes.func,
    title: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
};

export default clgComponentName(Button, 'Button');
