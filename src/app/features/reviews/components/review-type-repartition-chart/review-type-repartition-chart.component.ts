import { inject, signal, effect, computed, Component } from "@angular/core";
import { ReviewStats } from "@features/reviews/models/review.model";
import { ReviewService } from "@features/reviews/services/review.service";
import { ChartConfiguration, ChartOptions, TooltipItem } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { ChartColorService } from "src/app/shared/services/chart-color.service";
import { createAsyncState } from "src/app/shared/utils/create-async-state";

@Component({
  selector: 'app-review-type-repartition-chart',
  standalone: true,
  imports: [BaseChartDirective, SpinnerComponent],
  templateUrl: './review-type-repartition-chart.component.html',
  styleUrl: './review-type-repartition-chart.component.scss',
})
export class ReviewTypeRepartitionChartComponent {

  private reviewService = inject(ReviewService);
  private chartColorService = inject(ChartColorService);

  statsState = createAsyncState(() =>
    this.reviewService.getReviewStats()
  );

  pieChartData = signal<ChartConfiguration<'pie'>['data']>({
    labels: [],
    datasets: [{ data: [] }]
  });

  pieChartOptions = signal<ChartOptions<'pie'>>({});

  constructor() {
    effect(() => {
      const stats = this.statsState.data();
      if (stats) {
        this.loadStatsByType(stats);
      }
    });

    this.statsState.run();
  }

  loadStatsByType(stats: ReviewStats) {

    const labels = ['Positif', 'Neutre', 'Négatif'];

    const values = [
      stats.POSITIVE ?? 0,
      stats.NEUTRAL ?? 0,
      stats.NEGATIVE ?? 0,
    ];

    const colors = [
      this.chartColorService.get('bg-positive'),
      this.chartColorService.get('bg-neutral'),
      this.chartColorService.get('bg-negative'),
    ];

    const total = values.reduce((a, b) => a + b, 0);

    this.pieChartData.set({
      labels,
      datasets: [{ data: values, backgroundColor: colors }],
    });

    this.pieChartOptions.set({
      plugins: {
        title: {
          display: true,
          text: `Répartition des avis (${total} total)`,
          font: { size: 16, weight: 'bold' },
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<'pie'>) => {
              const value = context.raw as number;
              const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
              return `${value} (${percent}%)`;
            },
          },
        },
      },
    });
  }

  isLoading = computed(() =>
    this.statsState.loading()
  );

  hasError = computed(() =>
    this.statsState.error() !== null
  );

  errorMessage = computed(() =>
    this.statsState.error()
  );

}