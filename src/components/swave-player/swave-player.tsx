import { Component, Prop, State, Element, Listen} from "@stencil/core";
import Swave from "swave";

@Component({
  tag: "swave-player",
  styleUrl: "swave-player.scss"
})
export class SwavePlayer {
  @Prop() audioUrl: string;
  @Prop() title: string;
  @State() private plays = false;
  @State() private currentTime;
  @State() private totalTime;
  @Element() private element: HTMLElement;
  private swave: any;

  componentWillLoad() {
    this.swave = new Swave({audioUrl: this.audioUrl});
    this.swave.disableVisualization();
    this.swave.audio.ontimeupdate = () => {
      this.currentTime = this.swave.audio.currentTime;
    }
    this.swave.audio.onloadedmetadata = () => {
      this.totalTime = this.swave.audio.duration;
    }
  }

  componentDidLoad() {

    this.swave.enableVisualization(this.element.querySelector(".canvas"));
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

  setProgress(e) {
    let rect = e.currentTarget.getBoundingClientRect(); // always gets the target that the event is set on
    let x = e.clientX - rect.left; //x position within the element.
    let xPercent = (x / rect.width) * 100;
    let newCurrentTime = this.totalTime * xPercent / 100;
    this.pause();
    this.swave.setCurrentTime(newCurrentTime);
    this.play();
  }

  fastForward() {
    if (this.currentTime < this.totalTime) {
      this.pause();
      this.swave.setCurrentTime(this.currentTime + 1);
      this.play();
    }
  }

  fastBackward() {
    if (this.currentTime > 0) {
      this.pause();
      this.swave.setCurrentTime(this.currentTime - 1);
      this.play();
    }
  }

  togglePlay() {
    this.plays = !this.plays;
    this.plays ? this.play() : this.pause();
  }


  render() {
    return <div class='swave-player'>
      <div class="thumbnail" style={{backgroundImage: `url('https://placeimg.com/200/200/any')`}}>
        <div class="controls">
          <div class="fast-backward" onClick={() => this.fastBackward()}>
            <span></span><span></span>
          </div>
          <div class="play-stop" onClick={() => this.togglePlay()}>
            <span class={this.plays ? 'pause' : 'play'}></span>
          </div>
          <div class="fast-forward" onClick={() => this.fastForward()}>
            <span></span><span></span>
          </div>
        </div>
      </div>

      <div class="actions">
        <div class="canvas"></div>

        <div class="title">
          {this.title}
        </div>

        <div class="progress-wrapper">
          <div class="progress-bar" onClick={($event) => this.setProgress($event)}>
            <div class="inner-progress" style={{ width: (this.currentTime / this.totalTime) * 100 + '%'}}>
            </div>
          </div>
        </div>

      </div>
    </div>;
  }
}
