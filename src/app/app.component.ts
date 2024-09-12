import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite/flowbite.service';
import { NavbarComponent } from './shared/components/ui/navbar/navbar.component';
import { FooterComponent } from './shared/components/ui/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) { }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => { });
  }
  title = 'e-commerce';
}
