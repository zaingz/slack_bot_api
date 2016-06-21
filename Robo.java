import java.awt.Robot;
import java.awt.AWTException;
import java.awt.event.KeyEvent;


public class Robo
{
    public static void main(String args[])
    {
        try {
            Robot robot = new Robot();
while(true){           
	 robot.delay(1000);
            robot.keyPress(KeyEvent.VK_W);
	    robot.setAutoDelay(40);
 
    robot.keyRelease(KeyEvent.VK_W);
            robot.setAutoWaitForIdle(true);
             robot.delay(1000);
   	    System.out.print("w");

  
    }
        } catch (AWTException e) {
            e.printStackTrace();
        }
    }
};
