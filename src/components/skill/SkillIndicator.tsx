import * as React from 'react';
import GameIcon from '../GameIcon';
import styles from './SkillIndicator.module.scss'
import Skill from '../../models/Skill';
export interface SkillIndicatorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  skill: Skill
}

export default class SkillIndicator extends React.Component<SkillIndicatorProps, any> {
  state = {
    currentTime: new Date().valueOf()
  }
  timer = 0
  componentDidMount() {
    const { skill } = this.props
    skill.addAttributesChangeListener(this.handleAttributesChange)
    this.timer = window.setInterval(
      this.tick,
      30
    )
  }
  componentWillUnmount() {
    const { skill } = this.props
    skill.removeAttributesChangeListener(this.handleAttributesChange)
    window.clearInterval(this.timer)
  }
  handleAttributesChange(_: Skill, key: string, value: any) {
    if (key === 'lastCastTime') {
      this.forceUpdate()
    }
  }
  tick = () => {
    this.setState({
      currentTime: this.state.currentTime + 30
    })
  }
  public render() {
    const { skill, ...otherProps } = this.props
    const { currentTime } = this.state
    const rate = (currentTime - skill.lastCastTime) < skill.cooldown ? 1 - (currentTime - skill.lastCastTime) / skill.cooldown : 0
    const width = 40 * rate
    return (
      <div 
        {...otherProps} 
        className={`${styles.SkillIndicator} ${otherProps.className || ''}`} 
        style={{
          ...(otherProps.style || {}),
          boxShadow: `inset 0px 0px ${width}px 0px #fff`,
          willChange: 'box-shadow',
        }}
      >
        <GameIcon 
          src={`skill/${skill.avatar || skill.name}`} 
          size="small"
          style={{
            background: 'transparent',
          }}
        />
      </div>
    );
  }
}
