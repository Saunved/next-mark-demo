/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { ArrowUpRight } from "phosphor-react";

function IconLink({ href, title, icon, external = false, iconSize = 0, iconLeft }) {
  const iconEl =
    icon || (external ? <ArrowUpRight size={iconSize || 16} /> : null);

  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      className="flex justify-start gap-1 items-center"
      rel="noreferrer"
    >
      {iconLeft} {title} {iconEl}
    </a>
  );
}

IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  iconLeft: PropTypes.element,
  external: PropTypes.bool,
  iconSize: PropTypes.number,
};

export default IconLink;
