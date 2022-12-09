// @ts-check
export function jsx(type, config, key) {
  // Components
  if (typeof type === "function") {
    return type(config);
  }

  // Arrays
  if (Array.isArray(type)) {
    return type;
  }

  // Fragments
  if (type === undefined) {
    return config.children;
  }

  // Convert to THREE name
  let name = `${type[0].toUpperCase()}${type.slice(1)}`;

  const { children, args, ...rest } = config;

  // Create object
  const instance = new THREE[name](...(args || []));

  // Apply props
  Object.entries(rest).forEach(([key, value]) => {
    const target = instance[key];

    if (target !== null && target.set) {
      if (Array.isArray(value)) {
        target.set(...value);
      } else {
        target.set(value);
      }
      return;
    }

    instance[key] = value;
  });

  const childrenArray = children
    ? Array.isArray(children)
      ? children
      : [children]
    : [];

  // Add children
  childrenArray.forEach((it) => {
    if (it === null || it === undefined) {
      return;
    } else if (Array.isArray(it)) {
      it.forEach((el) => instance.add(el));
    } else if (it.isObject3D) {
      instance.add(it);
    } else if (it.type.endsWith("Material")) {
      instance.material = it;
    } else if (it.type.endsWith("Geometry")) {
      instance.geometry = it;
    }
  });

  return instance;
}

export const jsxs = jsx;
