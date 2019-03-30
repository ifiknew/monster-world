import * as React from 'react';
import { Tooltip } from '@material-ui/core';

export interface AttributeTooltipProps {
  attribute?: App.Attributes
}

export default class AttributeTooltip extends React.Component<AttributeTooltipProps, any> {
  state = {
    open: false
  }
  public render() {
    const { attribute } = this.props
    const children: any = this.props.children
    const { open } = this.state
    const rows: Array<React.ReactNode> = []
    if (attribute) {
      const keyArr = ['name', 'level', 'health', 'mana', 'power', 'agility', 'intelligence']
      const keyMap: any = {
        'power': 'pow',
        'agility': 'agi',
        'intelligence': 'int'
      }
      keyArr.forEach(k => {
        if ((attribute as any)[k]) {
          rows.push(
            <div>
              <div style={{ display: 'inline-block', width: '5vh', marginRight: '2vh' }}>{keyMap[k] || k}</div>
              <div style={{ display: 'inline-block' }}>{(attribute as any)[k]}</div>
            </div>
          )
        }
      })
    }
    return (
      <Tooltip
        title={attribute ? <div>{rows}</div> : 'no item'}
        open={open}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
      >
        {children}
      </Tooltip>
    );
  }
}
