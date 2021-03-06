import React from 'react'
import { connect } from 'react-redux'
import Modal from './Modal'
import ModalMenu from './ModalMenu'
import RecordBar from './RecordBar'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { openInfo } from '../state/actions/ui'

const InfoMenu = ({ closeInfo }) => {
  return (
    <Modal onClose={closeInfo} left>
      <ModalMenu icon={<FA icon="info-circle" />} title="About">
        <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank" rel="noopener noreferrer">
          <li>
            <span className="subheader">About the game</span>
            <span>Mastermind</span>
          </li>
        </a>

        <a href="https://github.com/mcli830" target="_blank" rel="noopener noreferrer">
          <li>
            <span className="subheader">Developer</span>
            <span>Michael Li</span>
          </li>
        </a>

        <li className="subsection noclick">Controls</li>
        {[
          ['Click/Tap', 'Add/Select Glyph'],
          ['Right Click/Hold', 'Remove Glyph'],
        ].map(([action, func], i) => (
          <li key={i} className="noclick">
            <span className='subheader'>{action}</span>
            <span>{func}</span>
          </li>
        ))}

        <li className="subsection noclick">Interface</li>

        {[
          ['plug', 'Start game'],
          ['unlock-alt', 'Test sequence'],
          ['undo-alt', 'Clear glyphs'],
        ].map(([icon, text],i) => (
          <li key={i} className="menu-row noclick">
            <span className='subheader icon'>
              <FA icon={icon} />
            </span>
            <span className="has-text-centered">{text}</span>
          </li>
        ))}

        {[
          [4,0,'Red', 'Exact match'],
          [0,4,'White', 'Misplaced glyph']
        ].map(([perfect, near, color, desc], i) => (
          <li key={i} className="noclick">
            <span className="subheader">{color} Bar</span>
            <div className="menu-row">
              <span className="recordbar-wrapper">
                <RecordBar perfect={perfect} near={near} />
              </span>
              <span>{desc}</span>
            </div>
          </li>
        ))}

      </ModalMenu>
    </Modal>
  )
}

const mapDispatch = dispatch => ({
  closeInfo: () => dispatch(openInfo(false)),
})

export default connect(null, mapDispatch)(InfoMenu)
