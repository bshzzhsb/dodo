import namespaces, { NamespaceProps } from '@/constants/namespace';

export function namespace (name: string) {
  const i = name.indexOf(':');
  const prefix = name.slice(0, i);
  if (i >= 0 && prefix !== 'xmlns') {
    name = name.slice(i + 1);
    return { namespace: namespaces[prefix as NamespaceProps], local: name };
  }
  return { local: name };
}
