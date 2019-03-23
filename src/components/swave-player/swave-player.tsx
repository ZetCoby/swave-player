import { Component, Prop } from '@stencil/core';
import Swave from 'swave';

@Component({
  tag: 'swave-player',
  styleUrl: 'swave-player.scss',
  shadow: true
})
export class SwavePlayer {
  @Prop() audioUrl: string;
  private swave: any;
  private hostElement: any;

  componentWillLoad () {
      this.hostElement = document.createElement('div').innerHTML = "omg"; // this is not good
      this.swave = new Swave(this.hostElement); // this does not work
      console.log(this.audioUrl)
  }

  render() {
      console.log(this.audioUrl)
    return <div class='swave-player'>
        does it still work?
        {this.hostElement}
        </div>;
  }
}
