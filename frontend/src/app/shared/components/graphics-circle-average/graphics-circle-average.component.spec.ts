import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsCircleAverageComponent } from './graphics-circle-average.component';

describe('GraphicsCircleAverageComponent', () => {
  let component: GraphicsCircleAverageComponent;
  let fixture: ComponentFixture<GraphicsCircleAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsCircleAverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsCircleAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
