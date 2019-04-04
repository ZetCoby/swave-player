import {Component, Prop} from "@stencil/core";
import Swave from "swave";

@Component({
  tag: "swave-player",
  styleUrl: "swave-player.scss",
  shadow: true
})
export class SwavePlayer {
  @Prop() audioUrl: string;
  private swave: any;

  componentWillLoad() {
    this.swave = new Swave({audioUrl: this.audioUrl});
    console.log(this.audioUrl)
  }

  play() {
    this.swave.play();
  }

  stop() {
    this.swave.stop();
  }

  pause() {
    this.swave.pause();
  }


  render() {
    return <div class='swave-player'>
      <button onClick={() => this.play()}>Play</button>
    </div>;
  }
}
