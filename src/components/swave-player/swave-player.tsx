import { Component, Prop, State, Watch} from "@stencil/core";
import Swave from "swave";

@Component({
  tag: "swave-player",
  styleUrl: "swave-player.scss",
  shadow: true
})
export class SwavePlayer {
  @Prop() audioUrl: string;
  @Prop() title: string;
  @State() plays = false;
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

  togglePlay() {
    this.plays = !this.plays;
    console.log(this.plays)
  }


  render() {
    console.log("render")
    return <div class='swave-player'>
      <div class="thumbnail" style={{backgroundImage: `url('https://placeimg.com/200/200/any')`}}>
        <div class="controls">
          <div class="fast-backward">
            <span></span><span></span>
          </div>
          <div class="play-stop" onClick={() => this.togglePlay()}>
            <span class={this.plays ? 'pause' : 'play'}></span>
          </div>
          <div class="fast-forward">
            <span></span><span></span>
          </div>
        </div>
      </div>

      <div class="actions">
        <div class="title">
          {this.title}
        </div>

        <div class="progress-wrapper">
          <div class="progress-bar">
            <div class="inner-progress">
            </div>
          </div>
        </div>



      </div>
    </div>;
  }
}
