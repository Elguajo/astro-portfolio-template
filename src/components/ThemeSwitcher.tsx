import {useTheme} from "@heroui/use-theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faMoon } from '@fortawesome/free-solid-svg-icons';
import {Button} from "@heroui/react";

export default function App() {
  const { theme, setTheme } = useTheme()

  return (
    <Button className="text-[#333] dark:text-[#eee]" isIconOnly onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <FontAwesomeIcon icon={theme === 'dark' ? faCircleHalfStroke : faMoon} />
    </Button>
  )
};
