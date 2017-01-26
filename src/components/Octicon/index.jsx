import React from 'react';
import octicons from 'octicons';

const Octicon = ({ name, ...rest }) => {
  const icon = octicons[name];
  return (
    <svg
      viewBox={icon.options.viewBox}
      dangerouslySetInnerHTML={{ __html: icon.path }}
      {...rest}
    />
  );
}

export default Octicon;
