import * as React from 'react';
import GameIcon from '../GameIcon';
import styles from './SkillIndicator.module.scss'
export interface SkillIndicatorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  skill: App.Skill
}

export default class SkillIndicator extends React.Component<SkillIndicatorProps, any> {
  public render() {
    const { skill, ...otherProps } = this.props
    return (
      <div {...otherProps} className={`${styles.SkillIndicator} ${otherProps.className || ''}`} >
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
