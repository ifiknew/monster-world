import * as React from 'react';
import base from './svg/base'
import monster from './svg/monster'
import skill from './svg/skill'
export interface GameIconProps extends React.SVGProps<SVGSVGElement> {
  src: string,
  size?: 'smaller' | 'small' | 'default' | 'large' | 'larger'
}
const sizes = ['smaller', 'small', 'default', 'large', 'larger']
const SvgMap = {
  base,
  monster,
  skill
}
/**
 * @use simple factory
 */
export default class GameIcon extends React.Component<GameIconProps, any> {

  private getComponent = () => {
    const { src } = this.props
    const [ folder, file ] = src.replace(/ ([a-z])([^ ]*)/g, str => ` ${str[1].toUpperCase()}${str.substr(2)}`).split('/')
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
        {...otherProps}
        style={{ 
          width: `${sizes.indexOf(size) * 2 + 1}vh`,
          display: 'inline-flex',
          background: '#333',
          ...(otherProps.style || {})
        }}
      />
    );
  }
}
