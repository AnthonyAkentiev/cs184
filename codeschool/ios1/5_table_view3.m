// populate with items
#import "FeedTableViewController.h"

@implementation FeedTableViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Feed";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_feed.png"];
          self.imageTitleArray = @[@"Image 1",@"Image 2",@"Image 3",@"Image 4", @"Image 5"];
     }
     return self;
}

- (NSInteger)tableView:(UITableView *)tableView 
     numberOfRowsInSection:(NSInteger)section
{
     return self.imageTitleArray.count;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  NSLog(@"Image path: %s",self.imageFileNameArray[indexPath.row]);
  }

- (UITableViewCell *)tableView:(UITableView *)tableView
     cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
     UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];

     if(cell == nil) {
          cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Cell"];
     }

     cell.textLabel.text = self.imageTitleArray[indexPath.row-1];
     return cell;
}

@end

