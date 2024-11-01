
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClipService } from 'src/app/services/clip.service';
import IClip from 'src/app/models/clip.modal';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit {
  videoOrder = '1'
  clips: IClip[] = []
  activeClip: IClip | null = null
  sort$: BehaviorSubject<string>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipsService: ClipService,
    private modal: ModalService,
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder)

  }

  ngOnInit(): void {
    // this.route.data.subscribe(console.log)
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1'
      this.sort$.next(this.videoOrder)
    })
    this.clipsService.getUserClips(this.sort$).subscribe(docs => {
      this.clips = []

      docs.forEach(doc => {
        this.clips.push({
          docID: doc.id,
          ...doc.data()
        })
      })
    })
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement)

    // this.router.navigateByUrl(`/manage?sort=${value}`)  // More Simple
    this.router.navigate([], {                                // More Complex and powerfull.
      relativeTo: this.route,
      queryParams: {
        sort: value,
      }
    })
  }

  openModal($event: Event, clip: IClip) {
    $event.preventDefault()

    this.activeClip = clip

    this.modal.toggleModal('editClip')
  }

  update($event: IClip) {
    this.clips.forEach((element, index) => {
      if(element.docID == $event.docID) {
        this.clips[index].title = $event.title
      }
    })
  }

  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault()

    this.clipsService.deleteClip(clip)

    this.clips.forEach((element, index) => {
      if (element.docID == clip.docID){
        this.clips.splice(index, 1)
      }
    })
  }

  async copyClipboard($event: MouseEvent, docID: string | undefined) {
    $event.preventDefault()

    if(!docID) {
      return
    }

    const url = `${location.origin}/clip/${docID}`

    await navigator.clipboard.writeText(url);
  }

  navigateToClip(docID: string | undefined) {
    if (!docID) {
      return;
    }
    this.router.navigate(['/', 'clip', docID]);
  }

}
