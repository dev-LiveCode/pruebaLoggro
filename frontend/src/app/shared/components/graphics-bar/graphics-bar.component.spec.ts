import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsBarComponent } from './graphics-bar.component';

describe('GraphicsBarComponent', () => {
  let component: GraphicsBarComponent;
  let fixture: ComponentFixture<GraphicsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
