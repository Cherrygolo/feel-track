import { Component } from "@angular/core";
import { ReviewTypeRepartitionChartComponent } from "@features/reviews/components/review-type-repartition-chart/review-type-repartition-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReviewTypeRepartitionChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}