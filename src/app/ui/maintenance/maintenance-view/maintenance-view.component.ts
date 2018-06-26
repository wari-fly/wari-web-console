import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../core/data/message.service';
import { FirebaseService } from '../../../core/data/firebase.service';
import { ListConfig } from 'patternfly-ng';

@Component({
  selector: 'wari-maintenance-view',
  templateUrl: './maintenance-view.component.html',
  styleUrls: ['./maintenance-view.component.scss']
})
export class MaintenanceViewComponent implements OnInit {
  id: any;
  site: any;
  listConfig: ListConfig;
  files: any[];
  coordenadas: any[];
  constructor(private messageService: MessageService,
    private dataservice: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['key'];
    this.loadData();
    this.loadForm();
  }

  loadData() {
    this.dataservice
      .getByKey(this.id)
      .snapshotChanges()
      .subscribe(result => {
        this.site = result.map(c => ({ key: c.payload.key, ...c.payload.val() }))[0];
        this.files = this.site.files;
        this.coordenadas = this.site.coordenadas;
        this.messageService.success("Successfully loaded Wari Proyects");
      }, error => {
        this.messageService.error("Error loaded Wari Proyects");
      });
  }

  loadForm() {
    this.listConfig = {
      dblClick: false,
      multiSelect: false,
      selectItems: true,
      showCheckbox: false,
      showRadioButton: false,
      useExpandItems: false,
      usePinItems: true
    } as ListConfig;
  }
}
