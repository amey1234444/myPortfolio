import { Modal, Image, Text, Box, Center } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeModalProps {
  badge: {
    icon: string;
    displayName: string;
    hoverText: string;
  } | null;
  opened: boolean;
  onClose: () => void;
}

const BadgeModal = ({ badge, opened, onClose }: BadgeModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      padding="xl"
      withCloseButton={false}
      styles={{
        modal: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
        },
        overlay: {
          backdropFilter: 'blur(4px)',
          background: 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <AnimatePresence>
        {opened && (
          <Center>
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={badge?.icon}
                    alt={badge?.displayName}
                    width={200}
                    height={200}
                    fit="contain"
                    sx={{ margin: 'auto' }}
                  />
                </motion.div>
                <Text size="xl" weight={700} mt="md" color="dark.9">
                  {badge?.displayName}
                </Text>
                <Text size="sm" color="dark.6" mt="sm">
                  {badge?.hoverText}
                </Text>
              </Box>
            </motion.div>
          </Center>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default BadgeModal;