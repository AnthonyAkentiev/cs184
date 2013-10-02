#import "ViewController.h"

@implementation ViewController

- (void)viewDidLoad
{
     [super viewDidLoad];

     // UIButtonTypeDetailDisclosure
     UIButton* button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     button.frame = CGRectMake(120,100,80,44);
     [button setTitle:@"Tap me" forState:UIControlStateNormal];

     [self.view addSubview:button];
}
@end


/// set background
#import "ViewController.h"

@implementation ViewController

- (void)viewDidLoad
{
     [super viewDidLoad];

     UIButton *blueButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     blueButton.frame = CGRectMake(120, 100, 80, 44);
     [blueButton setTitle:@"Make blue!" forState:UIControlStateNormal];
     [self.view addSubview:blueButton];

     [blueButton addTarget:self
          action:@selector(buttonPressed:)
          forControlEvents:UIControlEventTouchUpInside];
}

- (void) buttonPressed:(UIButton*)sender
{
     self.view.backgroundColor = [UIColor blueColor];
     [sender removeFromSuperview];
}
@end


//// Two buttons
#import "ViewController.h"

@implementation ViewController

- (void)viewDidLoad
{
     [super viewDidLoad];

     UIButton *greenButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     greenButton.frame = CGRectMake(120, 200, 100, 44);
     [greenButton setTitle:@"Make green!" forState:UIControlStateNormal];
     [greenButton addTarget:self action:@selector(changeBackgroundColor:) forControlEvents:UIControlEventTouchUpInside];
     [self.view addSubview:greenButton];

     UIButton *blueButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
     blueButton.frame = CGRectMake(120, 100, 100, 44);
     [blueButton setTitle:@"Make blue!" forState:UIControlStateNormal];
     [blueButton addTarget:self action:@selector(changeBackgroundColor:) forControlEvents:UIControlEventTouchUpInside];
     [self.view addSubview:blueButton];
}

- (void) changeBackgroundColor:(UIButton *) sender
{
     if( [sender.titleLabel.text isEqualToString:@"Make green!"] )
     {
          self.view.backgroundColor = [UIColor greenColor];
     }else
     {
          self.view.backgroundColor = [UIColor blueColor];
     }
}
@end

