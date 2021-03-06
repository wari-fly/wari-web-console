import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'wari-read-multi-file',
  templateUrl: './read-multi-file.component.html',
  styleUrls: ['./read-multi-file.component.scss']
})
export class ReadMultiFileComponent implements OnInit {

  @Input()
  showFileName = false;

  @Output()
  complete: EventEmitter<any> = new EventEmitter<any>();

  files = new Array();

  constructor() { }

  ngOnInit() {
  }

  changeListener(event: any) {
    const self = this;
    if (event.target.files && event.target.files.length > 0) {
      const $files = event.target.files;
      for (var i = 0; i < $files.length; i++) {
        const file: File = $files[i];
        if (!file.type.match('image.*')) continue;
        const reader = new FileReader();
        reader.onloadend = () => {
          self.files.push({ url: reader.result, name: file.name });
        };
        reader.readAsDataURL(file);
      }
      self.complete.next({ data: self.files, files: event.target.files });
    } else {
      self.complete.next({ data: [], files: [] });
    }
  }

}
