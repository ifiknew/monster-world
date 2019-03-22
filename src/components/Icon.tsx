import * as React from 'react';
import base from './svg/base'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  src: string,
  size?: 'smaller' | 'small' | 'default' | 'large' | 'larger'
}
const sizes = ['smaller', 'small', 'default', 'large', 'larger']
const SvgMap = {
  base
}
/**
 * @use simple factory
 */
export default class Icon extends React.Component<IconProps, any> {

  private getComponent = () => {
    const { src } = this.props
    const [ folder, file ] = src.split('/')
    let Component: React.SFC<React.SVGProps<SVGSVGElement>>
    try {
      Component = (SvgMap as any)[folder][file]
    } catch (e) {
      throw new Error('Path not found:' + src)
    }
    if (!Comment) {
      throw new Error('File not found:' + src)
    }
    return Component
  }

  public render() {
    const { src, size = 'default', ...otherProps } = this.props
    const Component = this.getComponent()
    return (
      <Component 
        style={{ 
          width: `${sizes.indexOf(size) * 3 + 2}vh`,
          display: 'inline-flex',
          background: 'black',
        }}
        {...otherProps}
      />
    );
  }
}
