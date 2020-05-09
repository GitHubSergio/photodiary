/* eslint-disable import/no-extraneous-dependencies */
import { renderHook, act } from '@testing-library/react-hooks';
import { useInput } from '../customHooks';

jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

describe('customHooks', () => {
  describe('useInput', () => {
    it('should return the text value', () => {
      const testText = 'new text';
      const { result } = renderHook(() => useInput(testText));
      expect(result.current.value).toEqual(testText);
    });

    it('should update the text value', () => {
      let initialValue = 'default text';
      const { result } = renderHook(() => useInput(initialValue));

      initialValue = 'new text';

      act(() => {
        result.current.onChangeText(initialValue);
      });

      expect(result.current.value).toEqual('new text');
    });
  });
});
