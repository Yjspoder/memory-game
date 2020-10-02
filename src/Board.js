import React from 'react';
import Card from './Card.js';

class Board extends React.Component {
  constructor(props) {
    super(props)
    const emoji = [
      '💩',
      '👹',
      '👿',
      '🧠',
      '🚗',
      '🚲',
      '🚂',
      '🧸'
    ]
    const deck = emoji
      .concat(emoji)
      .sort(() => Math.random() - 0.5)
      .map(cv => {
        return {
          content: cv,
          faceUp: false,
        }
      })
    this.state = {
      deck: deck,
      firstCard: null,
    }
  }

  flipCardTo(cardIdx, faceUp) {
    this.setState({
      deck: this.state.deck.map((cv, i) => {
        if(i === cardIdx) {
          return {
            content: cv.content,
            faceUp: !cv.faceUp,
          }
        } else {
          return cv;
        }
      })
    })
  }

  flip(cardIdx) {
    if(this.state.firstCard === null) {
      this.setState({firstCard: cardIdx});
    } else {
      const firstCardContent = this.state.deck[this.state.firstCard].content;
      const secondCardContent = this.state.deck[cardIdx].content;
      if(firstCardContent === secondCardContent) {
        this.setState({firstCard: null});
      } else {
        setTimeout(() => {
          this.flipCardTo(this.state.firstCard, false)
          this.flipCardTo(cardIdx, false)
          this.setState({firstCard: null});
        }, 3000)
      }
    }

    this.flipCardTo(cardIdx, !this.state.deck[cardIdx].faceUp)
  }

  render () {
    console.log(this.state.firstCard);
    return (
      <div className="container">
        {this.state.deck.map((cv, i) => {
          return (<div className="Board">
            <Card
              flip={() => {this.flip(i)}}
              content={cv.content}
              faceUp={cv.faceUp} />
          </div>)
        })}
      </div>
    )
  }
}

export default Board;
